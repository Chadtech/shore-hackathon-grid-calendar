import styled from 'styled-components';
// Config
//   columns: string[]
//   rows: string[]
//

// System
//

// number: number, item: string
const repeat = (number, item) => {
  const output = [];
  for (let i = 0; i < number; i++) {
    output.push(item);
  }
  return output.join(' ');
};

const makeGrid = config => {
  return styled.div`
    display: grid;
    grid-template-columns: ${config.columns.join(' ')};
    grid-template-rows: ${config.rows.join(' ')};
  `;
};

const makeCell = config => {
  return styled.div`
    grid-column: ${props =>
      [String(props.column + 1), '/', String(props.column + 1 + props.w)].join(
        ' ',
      )};
    grid-row: ${props =>
      [String(props.row + 1), '/', String(props.row + 1 + props.h)].join(' ')};
  `;
};

const makeSystem = config => {
  return {
    Grid: makeGrid(config),
    Cell: makeCell(config),
  };
};

export default {
  make: makeSystem,
  repeat,
};
