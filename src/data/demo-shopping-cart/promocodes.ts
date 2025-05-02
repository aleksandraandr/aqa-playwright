export const promoCodes = [
    "HOT-COURSE",
    "NO-PYTHON",
    "JAVA-FOR-BOOMERS",
    "15-PERCENT-FOR-CSS",
    "HelloThere",
    "5-PERCENT-FOR-UTILS",
    "10-PERCENT-FOR-REDEEM"
  ] as const;
  
 type PromoCodes = typeof promoCodes[number];

  export const promoCodeDiscountMap: Record<PromoCodes, number> = {
    "HOT-COURSE": 10,
    "NO-PYTHON": 8,
    "JAVA-FOR-BOOMERS": 7,
    "15-PERCENT-FOR-CSS": 15,
    "HelloThere": 20,
    "5-PERCENT-FOR-UTILS": 5,
    "10-PERCENT-FOR-REDEEM": 10,
  };