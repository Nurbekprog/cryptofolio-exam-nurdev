import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

function App() {

  return (
    <HelmetProvider>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypto/:id" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </HelmetProvider>
  )
}

export default App
