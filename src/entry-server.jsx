import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App.jsx';
import { pageInfo } from './data/pageInfo.js';

export { pageInfo };

export function render(pathname) {
  return renderToString(
    <MemoryRouter initialEntries={[pathname]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}
