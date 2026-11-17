import { getProduct } from '@/api/product'
import { ImageViewer } from '@/components/image-viewer'
import { ProductDetailHeader } from '@/components/product-detail-header'
import { getErrorMessage } from '@/lib/axios'
import { favoriteStore } from '@/store/favorite'
import { common } from '@/styles/common'
import { productDetail as styles } from '@/styles/product-detail'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { useRef, useState } from 'react'
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type ScrollViewInstance,
  type NativeSyntheticEvent,
} from 'react-native'
import { useUnistyles } from 'react-native-unistyles'

const LOW_STOCK = 10

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { rt } = useUnistyles()
  const { data: product, isLoading, error } = getProduct(id)
  const isFavorite = favoriteStore((s) => (product ? s.ids.includes(product.id) : false))
  const toggleFavorite = favoriteStore((s) => s.toggle)
  const [page, setPage] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const carouselRef = useRef<ScrollViewInstance>(null)
  const [scrollY] = useState(() => new Animated.Value(0))

  // Keep the carousel on the image the viewer was closed on
  const closeViewer = (index: number) => {
    setViewerOpen(false)
    setPage(index)
    carouselRef.current?.scrollTo({ x: index * rt.screen.width, animated: false })
  }

  const onSlide = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setPage(Math.round(e.nativeEvent.contentOffset.x / rt.screen.width))

  if (isLoading) {
    return (
      <View style={common.screen}>
        <ProductDetailHeader scrollY={scrollY} showAt={rt.screen.width} />
        <ActivityIndicator style={[common.center, { marginTop: rt.insets.top + 80 }]} />
      </View>
    )
  }

  if (error || !product) {
    return (
      <View style={common.screen}>
        <ProductDetailHeader scrollY={scrollY} showAt={rt.screen.width} />
        <Text style={[common.errorText, { marginTop: rt.insets.top + 44 }]}>
          {error ? getErrorMessage(error) : 'Product not found'}
        </Text>
      </View>
    )
  }

  const discount = Math.round(product.discountPercentage)
  // dummyjson `price` is already discounted, so derive the original price from the percentage
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
  const images = product.images.length ? product.images : [product.thumbnail]

  return (
    <View style={common.screen}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        <ScrollView
          ref={carouselRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onSlide}
        >
          {images.map((uri) => (
            <Pressable key={uri} onPress={() => setViewerOpen(true)}>
              <Image source={uri} style={styles.slide} contentFit='contain' />
            </Pressable>
          ))}
        </ScrollView>
        {images.length > 1 ? (
          <View style={styles.dots}>
            {images.map((uri, i) => (
              <View key={uri} style={styles.dot(i === page)} />
            ))}
          </View>
        ) : null}

        <View style={styles.body}>
          <View style={styles.topRow}>
            <Text style={styles.category}>{product.category.replace(/-/g, ' ')}</Text>
            <Pressable
              accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              onPress={() => toggleFavorite(product.id)}
            >
              <Text style={styles.heart}>{isFavorite ? '♥' : '♡'}</Text>
            </Pressable>
          </View>
          <Text style={styles.title}>{product.title}</Text>
          {product.brand ? <Text style={styles.brand}>{product.brand}</Text> : null}

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            {discount > 0 ? (
              <>
                <Text style={styles.originalPrice}>${originalPrice}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>-{discount}%</Text>
                </View>
              </>
            ) : null}
          </View>

          <View style={styles.meta}>
            <Text style={common.textBold}>★ {product.rating.toFixed(1)}</Text>
            <Text style={styles.stock(product.stock < LOW_STOCK)}>
              {product.stock < LOW_STOCK
                ? `Only ${product.stock} left`
                : `${product.stock} in stock`}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {product.tags.length ? (
            <View style={styles.tags}>
              {product.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <Text style={styles.sku}>SKU: {product.sku}</Text>
        </View>
      </Animated.ScrollView>
      <ImageViewer visible={viewerOpen} images={images} initialIndex={page} onClose={closeViewer} />
      <ProductDetailHeader scrollY={scrollY} title={product.title} showAt={rt.screen.width} />
    </View>
  )
}
