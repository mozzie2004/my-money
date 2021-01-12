import React from 'react';

const Count = ({title, sum}) => {
return (
    <li className="counts__item">
        <div>{title}</div>
        <div>
            {sum}
        </div>
    </li>
)
}

export default Count;