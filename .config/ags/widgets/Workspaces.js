const hyprland = await Service.import("hyprland");

function openWorkspace(workspaceNumber) {
    hyprland.messageAsync(`dispatch workspace ${workspaceNumber}`);
}

function WorkspaceButton(workspaceId) {
    return Widget.Button({
        class_name: "workspace",
        on_clicked: () => openWorkspace(workspaceId),
        child: Widget.Label({
            label: workspaceId.toString(),
            class_name: "workspace-label",
        }),
        setup: self => self.hook(hyprland, () => {
            self.toggleClassName("active", hyprland.active.workspace.id === workspaceId),
            self.toggleClassName("occupied", (hyprland.getWorkspace(workspaceId)?.windows || 0) > 0);
        })
    });
}

export default function Workspaces() {
    const workspaces = Array.from({ length: 10 }, (_, id) => id + 1).map(id => WorkspaceButton(id));

    return Widget.EventBox({
        on_scroll_up: () => openWorkspace("m+1"),
        on_scroll_down: () => openWorkspace("m-1"),
        child: Widget.Box({
            class_name: "workspaces",
            children: workspaces
        })
    });
}
