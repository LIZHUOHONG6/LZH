import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // 使得代码中的 process.env.API_KEY 在构建时能读取到环境变量
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})