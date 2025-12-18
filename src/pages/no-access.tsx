export default function NoAccess() {
    return (
        <div className="h-screen flex items-center justify-center text-center">
            <div>
                <h1 className="text-3xl font-bold">Access Restricted</h1>
                <p className="mt-2 text-muted-foreground">
                    You do not have access to this collection.
                </p>
            </div>
        </div>
    );
}
