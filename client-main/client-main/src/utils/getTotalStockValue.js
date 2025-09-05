import axios from 'axios';
import BASE_URL from '../pages/config/config';

export const getTotalStockValue = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/products/stock`, {
      // params: { page: 1, limit: 1000000 }
    });
    // If response is paginated, use res.data.products, else res.data
    const products = res.data.products || res.data;
    const totalValue = products.reduce((acc, product) => {
      return acc + (Number(product.stockValue) || 0);
    }, 0);
    return totalValue;
  } catch (err) {
    return 0;
  }
};
