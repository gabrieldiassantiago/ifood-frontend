'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  CheckCircle2,
  Truck,
  ChefHat,
  XCircle,
  QrCode,
  ShoppingBag,
  History,
  Loader2
} from 'lucide-react'

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  PENDING: { label: 'Aguardando', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: Clock },
  PENDING_PAYMENT: { label: 'Pagar PIX', color: 'text-red-600', bgColor: 'bg-red-50', icon: QrCode },
  CONFIRMED: { label: 'Confirmado', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: CheckCircle2 },
  PREPARING: { label: 'No Fogão', color: 'text-red-600', bgColor: 'bg-red-50', icon: ChefHat },
  OUT_FOR_DELIVERY: { label: 'A Caminho', color: 'text-red-600', bgColor: 'bg-red-50', icon: Truck },
  DELIVERED: { label: 'Entregue', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle2 },
  CANCELLED: { label: 'Cancelado', color: 'text-gray-400', bgColor: 'bg-gray-50', icon: XCircle }
}

export default function OrdersList({
  initialOrders,
  initialLimit,
}: {
  initialOrders: any[]
  initialLimit: number
}) {
  const router = useRouter()

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const [orders, setOrders] = useState<any[]>(initialOrders ?? [])
  const [offset, setOffset] = useState<number>((initialOrders?.length ?? 0)) // próximo offset
  const [hasMore, setHasMore] = useState<boolean>((initialOrders?.length ?? 0) === initialLimit)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const isDone = ['DELIVERED', 'CANCELLED'].includes(o.status)
      if (filter === 'active') return !isDone
      if (filter === 'completed') return isDone
      return true
    })
  }, [orders, filter])

  async function loadMore() {
    if (!hasMore || loadingMore) return
    setLoadingMore(true)

    try {
      const limit = initialLimit
      const res = await fetch(`/api/orders?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        cache: 'no-store',
      })

      if (res.status === 401) {
        router.push('/login')
        return
      }

      if (!res.ok) return

      const json = await res.json()
      const newOrders = json.data ?? json ?? []

      // se veio menos que o limit, acabou
      if (!Array.isArray(newOrders) || newOrders.length < limit) setHasMore(false)

      // evitar duplicados por id (se quiser)
      const seen = new Set(orders.map((o) => o.id))
      const merged = [...orders, ...newOrders.filter((o: any) => !seen.has(o.id))]

      setOrders(merged)
      setOffset(merged.length)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <div className="pb-32">
      {/* HEADER FIXO */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-50 p-6">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">Meus Pedidos</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mt-1">
              {orders.length} registro(s) carregado(s)
            </p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-600 transition-colors"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </header>

      <nav className="max-w-xl mx-auto px-6 py-6 flex gap-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'active', label: 'Em Aberto' },
          { id: 'completed', label: 'Histórico' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === tab.id
                ? 'bg-red-600 text-white shadow-lg shadow-red-100 scale-105'
                : 'bg-gray-50 text-gray-400'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="max-w-xl mx-auto px-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length > 0 ? (
            <>
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onClick={() => router.push(`/orders/${order.id}`)}
                />
              ))}

              <motion.div layout className="pt-2">
                {hasMore ? (
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="w-full bg-gray-50 text-gray-500 hover:text-red-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Carregando...
                      </>
                    ) : (
                      'Ver mais'
                    )}
                  </button>
                ) : (
                  <div className="text-center text-xs font-bold text-gray-300 py-4">
                    Você chegou ao fim 🙂
                  </div>
                )}
              </motion.div>
            </>
          ) : (
            <EmptyState onBack={() => router.push('/')} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function OrderCard({ order, onClick }: { order: any; onClick: () => void }) {
  const status = statusConfig[order.status] || statusConfig.PENDING
  const StatusIcon = status.icon
  const isActive = !['DELIVERED', 'CANCELLED'].includes(order.status)

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onClick}
      className={`w-full p-5 rounded-[32px] text-left transition-all border-2 ${isActive ? 'border-red-50 bg-white shadow-xl shadow-red-500/5' : 'border-gray-50 bg-white'
        }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${status.bgColor} ${status.color}`}>
          <StatusIcon size={24} strokeWidth={2.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {new Date(order.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
            </span>
            {isActive && <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />}
          </div>

          <h3 className="font-black text-gray-900 leading-tight truncate">
            {order.items?.map((i: any) => i.product?.name).filter(Boolean).join(', ') || 'Pedido'}
          </h3>

          <p className="text-xs font-bold text-gray-400 mt-1">
            #{order.id.slice(-6).toUpperCase()} • {order.items?.length ?? 0} item(s)
          </p>
        </div>

        <div className="text-right flex flex-col items-end gap-1">
          <span className="font-black text-gray-900 tracking-tighter">
            {Number(order.total ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>

          <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${status.bgColor} ${status.color}`}>
            {status.label}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center text-center px-8">
      <div className="w-20 h-20 bg-gray-50 rounded-[30px] flex items-center justify-center text-gray-300 mb-6">
        <History size={40} />
      </div>
      <h3 className="text-xl font-black text-gray-900 mb-2">Nada por aqui... ainda!</h3>
      <p className="text-sm text-gray-400 font-medium mb-8">Parece que sua fome está esperando por um novo pedido.</p>
      <button
        onClick={onBack}
        className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95 transition-all"
      >
        Ir para o Cardápio
      </button>
    </motion.div>
  )
}
