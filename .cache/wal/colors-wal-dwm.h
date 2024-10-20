static const char norm_fg[] = "#c1bebf";
static const char norm_bg[] = "#0D0E10";
static const char norm_border[] = "#878585";

static const char sel_fg[] = "#c1bebf";
static const char sel_bg[] = "#4D4D4E";
static const char sel_border[] = "#c1bebf";

static const char urg_fg[] = "#c1bebf";
static const char urg_bg[] = "#1C6D57";
static const char urg_border[] = "#1C6D57";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
