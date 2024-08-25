import { createProdMockServer } from 'vite-plugin-mock/client';
import mock from './mock';

export function setupProdMockServer() {
  createProdMockServer(mock);
}
