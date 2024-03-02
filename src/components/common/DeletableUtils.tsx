import { styled } from "styled-components";
import { colors } from "../../css";
import { Button } from "antd";

export const DeletableItemRow = styled.div`
    width: 100%;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
`;

export const StrikethroughSpan = styled.span`
    color: ${colors.danger};
    text-decoration: line-through;
`;

export const DeletableItemButton = styled(Button)`
    background: ${colors.danger};
    color: white;
    padding: 0px 8px;
    height: auto;

    &:hover {
        filter: brightness(0.9);
    }
`;
