import { Layout } from 'antd'
import { NavLink, Route, Routes } from 'react-router-dom'
import {
  AnalyzeResultDetailPage,
  DecomposeTaskListPage,
  DecomposeTaskRunPage,
  DictionaryImportPage,
  MeWordListPage,
} from './pages'
import './App.css'
import { Navigate } from 'react-router-dom'

function App() {
  const navItems = [
    { to: '/me', label: '词库', icon: '🏠', end: true },
    { to: '/import', label: '导入', icon: '🧩', end: true },
    { to: '/tasks', label: '任务', icon: '🏆', end: true },
    { to: '/tasks/run', label: '执行', icon: '⚡', end: true },
  ]

  return (
    <Layout className="app-root">
      <Layout.Content className="app-content">
        <div className="app-routes">
          <Routes>
            <Route path="/" element={<Navigate to="/me" replace />} />
            <Route path="/detail/:headword" element={<AnalyzeResultDetailPage />} />
            <Route path="/import" element={<DictionaryImportPage />} />
            <Route path="/tasks" element={<DecomposeTaskListPage />} />
            <Route path="/tasks/run" element={<DecomposeTaskRunPage />} />
            <Route path="/me" element={<MeWordListPage />} />
          </Routes>
        </div>
      </Layout.Content>

      <Layout.Footer className="app-footer">
        <div className="bottom-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </Layout.Footer>
    </Layout>
  )
}

export default App
