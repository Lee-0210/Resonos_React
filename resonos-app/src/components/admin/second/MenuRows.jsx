import React from 'react'
import MenuCard from '../first/MenuCard'

const MenuRows = ({ menuData }) => {
  return (
    <div className="admin">
      <div className="row g-4 mt-2">
        {menuData.map((rowItems, rowIndex) => (
          <div className="row g-4 mt-2" key={`row-${rowIndex}`}>
            {rowItems.map(({ link, label }, idx) => (
              <MenuCard
                key={`${label}-${idx}`}
                link={link}
                label={label}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


export default MenuRows