import { css } from "styled-components";

export const boxShadow = css`
    box-shadow: 0 0 10px 0 rgba(89, 120, 204, 0.2);
`;

export const card = css`
    padding: 1rem;
    border-radius: 8px;
    ${boxShadow}
`;

export const colors = {
    danger: "#ff0051",
};
