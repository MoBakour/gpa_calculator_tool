import { useState } from "react";
import IconShare from "../icons/IconShare";
import IconTick from "../icons/IconTick";
import useDataStore, {
    CONTENT_KEY,
    SYSTEM_KEY,
    LETTER_GRADES_KEY,
} from "../store/data.store";

const ShareButton = () => {
    const { content, system, letterGrades } = useDataStore();
    const [shareState, setShareState] = useState(false);

    // share link constructor
    const share = () => {
        // construct share URL
        const shareLink = new URL(window.location.origin);
        shareLink.searchParams.append(CONTENT_KEY, JSON.stringify(content));
        shareLink.searchParams.append(SYSTEM_KEY, JSON.stringify(system));

        // if current system is custom, add custom grades to the URL params
        if (system === "custom") {
            shareLink.searchParams.append(
                LETTER_GRADES_KEY,
                JSON.stringify(letterGrades.custom)
            );
        }

        navigator.clipboard.writeText(shareLink.href);

        setShareState(true);
        setTimeout(() => {
            setShareState(false);
        }, 1500);
    };

    return (
        <button
            className={`flex justify-center items-center gap-1 text-gray-400 transition ${
                !shareState
                    ? "hover:text-white cursor-pointer"
                    : "text-green-400 cursor-default"
            }`}
            onClick={share}
        >
            {shareState ? (
                <>
                    <span>Link copied to clipboard</span>
                    <IconTick />
                </>
            ) : (
                <>
                    <span>Share</span>
                    <IconShare />
                </>
            )}
        </button>
    );
};

export default ShareButton;
