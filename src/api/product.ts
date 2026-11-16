import axios from '@/lib/axios'
import type { Product, ProductInput, ProductList, ProductParams } from '@/types/product'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const PAGE_SIZE = 8

// Endpoint dummyjson berbeda tergantung filter (search / category / semua)
const getListUrl = ({ q, category }: ProductParams) => {
  if (q) return 'products/search'
  if (category) return `products/category/${category}`

  return 'products'
}

/**
 * GET /products | /products/search?q= | /products/category/{slug}
 * Infinite scroll memakai limit & skip
 */
export const getProducts = (params: Omit<ProductParams, 'skip' | 'limit'> = {}) => {
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
  })
}

/** GET /products/{id} */
export const getProduct = (id?: number | string) => {
  return useQuery({
    queryKey: ['getProduct', id],
    queryFn: () => axios.get<Product>(`products/${id}`),
    select: ({ data }) => data,
    enabled: !!id,
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

/** POST /products/add (dummyjson hanya simulasi, data tidak benar-benar tersimpan) */
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
