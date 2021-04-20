import React, { FunctionComponent } from 'react'
import Footer from "./Footer"
import "./Layout.css"

type LayoutProps = {
  title: string,
  children: React.ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ title, children }) => 
  <div className='layout'>
    <h2>{title}</h2>
    <div id="paragraph"> {children} </div>
    <Footer />
  </div>

export default Layout
