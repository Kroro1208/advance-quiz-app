import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLAnchorElement).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
