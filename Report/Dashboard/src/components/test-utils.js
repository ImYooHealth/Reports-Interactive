// In a file like test-utils.js
import { render } from '@testing-library/react';

const customRender = (ui, options) => render(ui, options);

// re-export everything
export * from '@testing-library/react';

export { customRender };