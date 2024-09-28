static const char norm_fg[] = "#f0c4bf";
static const char norm_bg[] = "#0d0c12";
static const char norm_border[] = "#a88985";

static const char sel_fg[] = "#f0c4bf";
static const char sel_bg[] = "#CC3852";
static const char sel_border[] = "#f0c4bf";

static const char urg_fg[] = "#f0c4bf";
static const char urg_bg[] = "#98354A";
static const char urg_border[] = "#98354A";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
