import fs from 'fs'
import path from 'path'

interface Nav {
  text: string | undefined,
  collapsed?: boolean,
  items?: Nav[]
  link?: string
}

interface Sidebar {
  [key: string]: Nav[]
}

const generateNavAndSidebarItem = (dirPath: string, name: string): Nav => {
  try {
    const files = fs.readdirSync(dirPath, {
      withFileTypes: true
    })
    return files.reduce((pre, current) => {
      if(current.isDirectory()) {
        pre.items.push(generateNavAndSidebarItem(path.join(current.path, current.name), path.join(name, current.name)))
      } else {
        pre.items.push({
          text: current.name,
          link: `/${name}/${current.name}`
        })
      }
      return pre
    }, {
      text: name.split('/').pop(),
      collapsed: false,
      items: [] as Nav[]
    })
  } catch(err) {
    throw err
  }
}

export const generateNavAndSidebar = (entry: string) => {
  try {
    const entrys = fs.readdirSync(entry, {
      withFileTypes: true
    }).filter(i => i.name !== 'public' && i.isDirectory())

    return entrys.reduce((pre, current) => {
      const nav = generateNavAndSidebarItem(path.join(current.path, current.name), current.name)
      pre.nav.push(nav)
      pre.sidebar[`/${nav.text}/`] = [
        {
          text: '',
          items: nav.items
        }
      ]
      return pre
    },
    {
      nav: [] as Nav[] ,
      sidebar: {} as Sidebar
    })
  } catch(err) {
    throw err
  }
}