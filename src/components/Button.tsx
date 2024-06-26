import { ReactNode } from "react";

interface IButtonProps {
    className?: string;
    size?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

const Button = ({
    className,
    size = "medium",
    onClick,
    children,
}: IButtonProps) => {
    let sizeClasses = "";

    switch (size) {
        case "small": {
            sizeClasses = "text-sm p-2";
            break;
        }
        case "medium": {
            sizeClasses = "text-base p-3";
            break;
        }
        case "large": {
            sizeClasses = "text-lg p-4";
            break;
        }
    }

    return (
        <button
            className={`rounded font-bold cursor-pointer transition hover:transform hover:scale-95 ${sizeClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
