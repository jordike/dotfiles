const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#0c0909", /* black   */
  [1] = "#5B6471", /* red     */
  [2] = "#8A6E57", /* green   */
  [3] = "#5C6C82", /* yellow  */
  [4] = "#6E7886", /* blue    */
  [5] = "#7A8592", /* magenta */
  [6] = "#949DA8", /* cyan    */
  [7] = "#d1d6db", /* white   */

  /* 8 bright colors */
  [8]  = "#929599",  /* black   */
  [9]  = "#5B6471",  /* red     */
  [10] = "#8A6E57", /* green   */
  [11] = "#5C6C82", /* yellow  */
  [12] = "#6E7886", /* blue    */
  [13] = "#7A8592", /* magenta */
  [14] = "#949DA8", /* cyan    */
  [15] = "#d1d6db", /* white   */

  /* special colors */
  [256] = "#0c0909", /* background */
  [257] = "#d1d6db", /* foreground */
  [258] = "#d1d6db",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
