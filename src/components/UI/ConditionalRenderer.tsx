interface IConditionalRendererProps {
    condition: boolean;
    children: () => JSX.Element;
}

const ConditionalRenderer = ({ condition, children }: IConditionalRendererProps) => {
    return condition ? children() : null;
}

export default ConditionalRenderer;
