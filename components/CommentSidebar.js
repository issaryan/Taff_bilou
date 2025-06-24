export default function CommentSidebar({props}) {
    return (
        <>
            <h2>Comments</h2>
            <p>This is the comment sidebar.</p>
            <p>Props: {JSON.stringify(props)}</p>
        </>
    );

}