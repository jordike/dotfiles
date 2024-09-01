static const char norm_fg[] = "#d1cecf";
static const char norm_bg[] = "#111010";
static const char norm_border[] = "#929090";

static const char sel_fg[] = "#d1cecf";
static const char sel_bg[] = "#4D779D";
static const char sel_border[] = "#d1cecf";

static const char urg_fg[] = "#d1cecf";
static const char urg_bg[] = "#36688F";
static const char urg_border[] = "#36688F";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
