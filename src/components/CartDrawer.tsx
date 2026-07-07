import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export function CartDrawer() {
  const cart = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const discount = couponApplied ? cart.subtotal * 0.1 : 0;
  const total = cart.subtotal - discount;

  return (
    <AnimatePresence>
      {cart.open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cart.setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
          >
            <header className="flex items-center justify-between border-b p-5">
              <div className="flex items-center gap-2 font-display text-xl font-bold">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Your Cart
                <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-sm text-primary">
                  {cart.count}
                </span>
              </div>
              <button
                onClick={() => cart.setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-muted transition hover:bg-accent"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.items.length === 0 ? (
                <div className="grid h-full place-items-center text-center text-muted-foreground">
                  <div>
                    <div className="text-6xl">🧸</div>
                    <p className="mt-3 font-semibold">Your cart is empty</p>
                    <p className="text-sm">Add some magical goodies!</p>
                  </div>
                </div>
              ) : (
                <ul className="grid gap-3">
                  {cart.items.map((i) => (
                    <li
                      key={i.product.id}
                      className={`flex items-center gap-3 rounded-2xl p-3 ${i.product.color}`}
                    >
                      <div className="grid h-14 w-14 place-items-center rounded-xl bg-background text-3xl">
                        {i.product.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{i.product.name}</p>
                        <p className="text-xs text-muted-foreground">${i.product.price} each</p>
                        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-background p-0.5">
                          <button
                            className="grid h-6 w-6 place-items-center rounded-full hover:bg-muted"
                            onClick={() => cart.setQty(i.product.id, i.qty - 1)}
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-6 text-center text-xs font-bold">{i.qty}</span>
                          <button
                            className="grid h-6 w-6 place-items-center rounded-full hover:bg-muted"
                            onClick={() => cart.setQty(i.product.id, i.qty + 1)}
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => cart.remove(i.product.id)}
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="border-t bg-muted/40 p-5">
                <div className="mb-3 flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code (try KIDS10)"
                    className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => setCouponApplied(coupon.trim().toUpperCase() === "KIDS10")}
                    className="btn-bounce rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background"
                  >
                    Apply
                  </button>
                </div>
                <dl className="grid gap-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="font-semibold">${cart.subtotal.toFixed(2)}</dd>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-mint-foreground">
                      <dt>Coupon KIDS10</dt>
                      <dd className="font-semibold">−${discount.toFixed(2)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 font-display text-lg font-bold">
                    <dt>Total</dt>
                    <dd>${total.toFixed(2)}</dd>
                  </div>
                </dl>
                <button className="btn-bounce mt-4 w-full rounded-full bg-primary py-3 font-bold text-primary-foreground shadow-toy">
                  Checkout →
                </button>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Secure checkout · Free shipping over $30
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
