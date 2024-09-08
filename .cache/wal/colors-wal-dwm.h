static const char norm_fg[] = "#d1d6db";
static const char norm_bg[] = "#0c0909";
static const char norm_border[] = "#929599";

static const char sel_fg[] = "#d1d6db";
static const char sel_bg[] = "#8A6E57";
static const char sel_border[] = "#d1d6db";

static const char urg_fg[] = "#d1d6db";
static const char urg_bg[] = "#5B6471";
static const char urg_border[] = "#5B6471";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
