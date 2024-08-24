const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#0d0c12", /* black   */
  [1] = "#98354A", /* red     */
  [2] = "#CC3852", /* green   */
  [3] = "#A84959", /* yellow  */
  [4] = "#DE5E66", /* blue    */
  [5] = "#F0867B", /* magenta */
  [6] = "#E67D82", /* cyan    */
  [7] = "#f0c4bf", /* white   */

  /* 8 bright colors */
  [8]  = "#a88985",  /* black   */
  [9]  = "#98354A",  /* red     */
  [10] = "#CC3852", /* green   */
  [11] = "#A84959", /* yellow  */
  [12] = "#DE5E66", /* blue    */
  [13] = "#F0867B", /* magenta */
  [14] = "#E67D82", /* cyan    */
  [15] = "#f0c4bf", /* white   */

  /* special colors */
  [256] = "#0d0c12", /* background */
  [257] = "#f0c4bf", /* foreground */
  [258] = "#f0c4bf",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
