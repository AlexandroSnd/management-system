import {type ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  wrapperId?: string;
}

function getPortalWrapper(wrapperId: string) {
    let element = document.getElementById(wrapperId);
    if (!element) {
        element = document.createElement('div');
        element.setAttribute('id', wrapperId);
        document.body.appendChild(element);
    }
    return element;
}

export const Portal = ({ children, wrapperId = 'modal-root' }: PortalProps) => {
    const targetElement = getPortalWrapper(wrapperId);
    return ReactDOM.createPortal(children, targetElement);
};