import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globalStyles'
import { darkTheme, lightTheme } from './styles/theme'
import { Helmet } from 'react-helmet'
import { SPageContainer } from './styles/containerStyles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header/Header'
import Layout from './components/Layout'
import Signin from './features/auth/Signin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'

import Billings from './features/billings/Billing'
import Invoice from './features/billings/invoice/Invoice'
import InvoiceAdd from './features/billings/invoice/InvoiceAdd'
import Clients from './features/clients/ClientsList'
import ClientAddEdit from './features/clients/Client'
import Profile from './features/profile/Profile'
import ProfileHours from './features/profile/ProfileHours'
import TasksList from './features/tasks/TasksList'
import Task from './features/tasks/Task'
import Timeslips from './features/timeslips/TimeslipsList'
import TimeslipAddEdit from './features/timeslips/Timeslip'
import Users from './features/users/UsersList'
import UserAddEdit from './features/users/User'

function App() {
  const { theme } = useSelector((state) => state.ui)
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Helmet>
        <title>TimeKeeper</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <>
        <Header />
        <SPageContainer>
          <Routes>
            <Route path='/' element={<Layout />}>
              {/* public routes */}
              <Route path='signin' element={<Signin />} />

              {/* protected routes */}
              <Route
                element={
                  <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                }
              >
                <Route path='clients'>
                  <Route index element={<Clients />} />
                  <Route path=':id' element={<ClientAddEdit />} />
                  <Route path='add' element={<ClientAddEdit />} />
                </Route>

                <Route path='profile'>
                  <Route index element={<Profile />} />
                  <Route path='hours' element={<ProfileHours />} />
                </Route>

                <Route path='/tasks' element={<TasksList />} />
                <Route path='/task' element={<Task />} />
                <Route path='/task/:id' element={<Task />} />

                <Route path='timeslips'>
                  <Route index element={<Timeslips />} />
                  <Route path=':id' element={<TimeslipAddEdit />} />
                  <Route path='add' element={<TimeslipAddEdit />} />
                </Route>

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
                  }
                >
                  <Route path='billings'>
                    <Route index element={<Billings />} />
                    <Route path=':id' element={<Invoice />} />
                    <Route path='add' element={<InvoiceAdd />} />
                  </Route>

                  <Route path='users'>
                    <Route index element={<Users />} />
                    <Route path=':id' element={<UserAddEdit />} />
                    <Route path='add' element={<UserAddEdit />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            {/* End Protected Routes */}
          </Routes>
        </SPageContainer>
        <ToastContainer autoClose={2000} />
      </>
    </ThemeProvider>
  )
}

export default App
