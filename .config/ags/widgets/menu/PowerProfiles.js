const powerProfiles = await Service.import("powerprofiles");
const opened = Variable(false);

function togglePowerProfile(profile) {
    powerProfiles.active_profile = profile;
}

function transformProfileName(profile) {
    return profile.charAt(0).toUpperCase() + profile.replace("-", " ").replace("_", " ").slice(1);
}

function PowerProfilesToggle() {
    return Widget.Box({
        className: powerProfiles.bind("active_profile").as(activeProfile => activeProfile === "balanced" ? "menu-option-toggle" : "menu-option-toggle active"),
        children: [
            Widget.Button({
                className: "menu-option-toggle-button",
                onClicked: () => togglePowerProfile("balanced"),
                child: Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "menu-option-toggle-button-icon",
                            icon: powerProfiles.bind("icon_name")
                        }),
                        Widget.Label({
                            hexpand: true,
                            xalign: 0,
                            className: "menu-option-toggle-button-label",
                            label: powerProfiles.bind("active_profile").as(name => transformProfileName(name))
                        })
                    ]
                })
            }),
            Widget.Button({
                className: "menu-option-toggle-expand",
                onClicked: () => opened.value = !opened.value,
                child: Widget.Label({
                    label: opened.bind().as(open => open ? "▲" : "▼")
                })
            })
        ]
    });
}

function PowerProfilesList() {
    return Widget.Revealer({
        className: "power-profiles-list",
        revealChild: opened.bind(),
        transition: "slide_down",
        transitionDuration: 10,
        child: Widget.Scrollable({
            css: "min-height: 100px",
            child: Widget.Box({
                vertical: true,
                className: "power-profiles-list-items menu-option-toggle-list",
                children: powerProfiles.bind("profiles").as(profiles => profiles.map(PowerProfile))
            })
        })
    })
}

function PowerProfile(profile) {
    return Widget.Box({
        className: "power-profile menu-option-toggle-list-item",
        vertical: true,
        children: [
            Widget.Button({
                className: "power-profile-toggle",
                onClicked: () => powerProfiles.active_profile = profile.Profile,
                child: Widget.Label({
                    xalign: 0,
                    label: transformProfileName(profile.Profile)
                })
            }),
        ]
    });
}

export default function PowerProfiles() {
    return Widget.Box({
        className: "power-profiles",
        vertical: true,
        children: [
            PowerProfilesToggle(),
            PowerProfilesList()
        ]
    });
}
