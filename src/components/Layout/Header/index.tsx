import { AccountCircle } from '@mui/icons-material'
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'

function Header() {
  const { data } = useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickSignOut = () => signOut()

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography component='div' sx={{ flexGrow: 1 }} variant='h6'>
              <Link href='/'>Design System Hub</Link>
            </Typography>
            {data?.user ? (
              <>
                <div className='laptop:hidden'>
                  <IconButton
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    aria-label='account of current user'
                    color='inherit'
                    onClick={handleMenu}
                    size='large'
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    id='menu-appbar'
                    keepMounted
                    onClose={handleClose}
                    open={Boolean(anchorEl)}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleClose}>MyPage</MenuItem>
                    <MenuItem onClick={onClickSignOut}>SignOut</MenuItem>
                  </Menu>
                </div>
                <div className='hidden gap-4 laptop:flex'>
                  <Link className='block' href='/post/create'>
                    NewPost
                  </Link>
                  <Link className='block' href='/mypage'>
                    MyPage
                  </Link>
                  <Link className='block' href='/' onClick={onClickSignOut}>
                    SignOut
                  </Link>
                </div>
              </>
            ) : (
              <Link href='/auth/signin'>SignIn</Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  )
}

export default Header
