
import { Request, Response } from 'express';
import { ClinicPromocaoService } from "../../services/ClinicPromocao";

async function getClinicPromocaoService(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const queries = req.query
    const { id } = req.params
    const getService = new ClinicPromocaoService();
    let results: any = null

    const objectFilter: any = {};

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    if (queries) objectFilter.queries = { ...queries, skip, take: limit, }
    if (id) objectFilter.id = parseInt(id)
    if (order) {
      objectFilter.queries.order = typeof order === "string" ? JSON.parse(order) : order;
    };

    if (!req.query.page) {
      delete objectFilter.queries.skip
    } else {
      delete objectFilter.queries.page
    }

    if (!req.query.limit) {
      delete objectFilter.queries.take
    } else {
      delete objectFilter.queries.limit
    }

    if (Object.keys(objectFilter).length > 0) {
      results = await getService.getClinicPromocao(objectFilter)
    }
    else {
      results = await getService.getClinicPromocao({})
    }

    const total = results?.length;
    const totalPages = Math.ceil(total / limit);
    const currentPage = page;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
    const nextPage = hasNextPage ? currentPage + 1 : null;
    const previousPage = hasPreviousPage ? currentPage - 1 : null;
    const pagination = {
      total,
      totalPages,
      currentPage,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage
    };

    if (results?.length === 0) {
      return res.status(404).json({ message: "Promocao not found" });
    }

    return res.json({ ...pagination, results, });
  } catch (err) {

    return res.status(500).json({ message: err.message });
  }
}

export default getClinicPromocaoService;
