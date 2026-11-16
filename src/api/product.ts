import axios from '@/lib/axios'
import type { Product, ProductInput, ProductList, ProductParams } from '@/types/product'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
  type QueryClient,
} from '@tanstack/react-query'
import { useEffect } from 'react'

const PAGE_SIZE = 8

// How long cached product data counts as fresh. While fresh, mounting a screen (or switching
// between the list versions) reuses the cache and does NOT refetch.
const PRODUCTS_STALE_TIME = 1000 * 60 * 5

type ProductPages = InfiniteData<ProductList, number>

// An infinite query refetches EVERY loaded page, one request each, once it is stale. Keeping only
// the first page in the cache means a refetch (or a reload) always costs a single request and the
// list starts again from page 1.
const keepFirstPage = (data?: ProductPages): ProductPages | undefined =>
  data && { pages: data.pages.slice(0, 1), pageParams: data.pageParams.slice(0, 1) }

// setQueryData would mark the data as freshly fetched, so keep the original timestamp
const trimToFirstPage = (queryClient: QueryClient, queryKey: readonly unknown[]) => {
  const updatedAt = queryClient.getQueryState(queryKey)?.dataUpdatedAt

  queryClient.setQueryData<ProductPages>(queryKey, keepFirstPage, { updatedAt })
}

// The dummyjson endpoint differs depending on the filter (search / category / all)
const getListUrl = ({ q, category }: ProductParams) => {
  if (q) return 'products/search'
  if (category) return `products/category/${category}`

  return 'products'
}

/**
 * GET /products | /products/search?q= | /products/category/{slug}
 * Infinite scroll using limit & skip
 */
export const getProducts = (params: Omit<ProductParams, 'skip' | 'limit'> = {}) => {
  const queryClient = useQueryClient()
  const paramsKey = JSON.stringify(params)

  // When the list unmounts (or the filter changes) trim this query back to page 1
  useEffect(() => {
    return () => trimToFirstPage(queryClient, ['getProducts', JSON.parse(paramsKey)])
  }, [queryClient, paramsKey])

  return useInfiniteQuery({
    queryKey: ['getProducts', params],
    queryFn: ({ pageParam }) =>
      axios
        .get<ProductList>(getListUrl(params), {
          params: { ...params, limit: PAGE_SIZE, skip: pageParam },
        })
        .then((res) => res.data),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const next = last.skip + last.limit

      return next < last.total ? next : undefined
    },
    select: (data) => data.pages.flatMap((page) => page.products),
    staleTime: PRODUCTS_STALE_TIME,
  })
}

/**
 * Pull to refresh: go back to page 1 and refetch only that page.
 * Usage: const refresh = refreshProducts()
 */
export const refreshProducts = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient
      .getQueryCache()
      .findAll({ queryKey: ['getProducts'] })
      .forEach((query) => {
        trimToFirstPage(queryClient, query.queryKey)
      })

    return queryClient.refetchQueries({ queryKey: ['getProducts'], type: 'active' })
  }
}

/** GET /products/{id} */
export const getProduct = (id?: number | string) => {
  return useQuery({
    queryKey: ['getProduct', id],
    queryFn: () => axios.get<Product>(`products/${id}`),
    select: ({ data }) => data,
    enabled: !!id,
    staleTime: PRODUCTS_STALE_TIME,
  })
}

/** GET /products/categories */
export const getProductCategories = () => {
  return useQuery({
    queryKey: ['getProductCategories'],
    queryFn: () => axios.get<{ slug: string; name: string; url: string }[]>('products/categories'),
    select: ({ data }) => data,
    staleTime: 1000 * 60 * 60,
  })
}

/** POST /products/add (dummyjson only simulates this, the data is not actually saved) */
export const createProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProductInput) => axios.post<Product>('products/add', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getProducts'] }),
  })
}

/** PUT /products/{id} */
export const updateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductInput }) =>
      axios.put<Product>(`products/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['getProducts'] })
      queryClient.invalidateQueries({ queryKey: ['getProduct', id] })
    },
  })
}

/** DELETE /products/{id} */
export const deleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => axios.delete<Product>(`products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getProducts'] }),
  })
}
