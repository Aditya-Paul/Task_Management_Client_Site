import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import Router from './Router/Router.jsx';
import Authprovider from './Provider/Authprovider.jsx';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={Router}>
              <App />
            </RouterProvider>
          </div>
        </QueryClientProvider>
      </DndProvider>

    </Authprovider>
  </React.StrictMode>,
)
