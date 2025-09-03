import {
  PaginationParams,
  SortingParams,
} from "@common/repositories/shared/CustomQueryBuilder/CustomQueryBuilder.types";
import { DEFAULT_RESULTS_PER_PAGE } from "@config/config";

export const getPaginationParams = (
  params: Partial<PaginationParams>
): PaginationParams => ({
  page: params.page && params.page > 0 ? params.page : 1,
  perPage:
    params.perPage && params.perPage > 0
      ? params.perPage
      : parseInt(DEFAULT_RESULTS_PER_PAGE || "20", 10) || 20,
});

export const getSortingParams = (
  params: Partial<SortingParams>
): SortingParams => ({
  orderBy: params.orderBy || "id",
  order: params.order || "ASC",
});
