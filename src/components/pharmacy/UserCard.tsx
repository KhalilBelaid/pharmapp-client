import * as React from 'react';
import { Image } from 'react-bootstrap';
import { Request } from '../../common/types';

type UserCardProps = {
    info: Request | undefined
}

export default function UserCard ({info}: UserCardProps) {
  return (
    <div className="d-flex gap-4 justify-content-start align-items-start border p-1">
        <Image rounded src={info?.picture.large}></Image>
        <div className="vr" />
        <div className="d-flex flex-column gap-1">
            <h3>{info?.name.first} {info?.name.last}</h3>
            <span>Age: {info?.dob.age}</span>
            <span>{info?.location.city}, {info?.location.state}</span>
        </div>        
        <div className="vr" />
        <div>
            <span>Conditions préexistantes</span>
            <ul>
                <li>Condition 1</li>
                <li>Condition 2</li>
                <li>Condition 3</li>
            </ul>
        </div>
    </div>
  );
}
