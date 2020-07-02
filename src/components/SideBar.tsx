import React from 'react'
import { SideBarHeading } from './SideBarHeading'
import { IoIosDocument } from 'react-icons/io'
import { SideBarElement } from './SideBarElement'

export const SideBar: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="">
        <SideBarElement title="Inbox">
          <IoIosDocument className="inline" size="1.5rem" />
        </SideBarElement>
        <SideBarElement title="Today">
          <IoIosDocument className="inline" size="1.5rem" />
        </SideBarElement>
      </div>

      <div className="">
        <SideBarHeading title="Projects" />

        <SideBarElement title="proj1">
          <IoIosDocument className="inline" size="1.5rem" />
        </SideBarElement>
        <SideBarElement title="Some confusingly large name for a project">
          <IoIosDocument className="inline" size="1.5rem" />
        </SideBarElement>
        <SideBarElement title="A real project">
          <IoIosDocument className="inline" size="1.5rem" />
        </SideBarElement>
      </div>
    </div>
  )
}
