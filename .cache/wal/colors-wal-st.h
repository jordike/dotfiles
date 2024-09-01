const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#111010", /* black   */
  [1] = "#36688F", /* red     */
  [2] = "#4D779D", /* green   */
  [3] = "#3D82AC", /* yellow  */
  [4] = "#5986AE", /* blue    */
  [5] = "#6A91B6", /* magenta */
  [6] = "#739EC5", /* cyan    */
  [7] = "#d1cecf", /* white   */

  /* 8 bright colors */
  [8]  = "#929090",  /* black   */
  [9]  = "#36688F",  /* red     */
  [10] = "#4D779D", /* green   */
  [11] = "#3D82AC", /* yellow  */
  [12] = "#5986AE", /* blue    */
  [13] = "#6A91B6", /* magenta */
  [14] = "#739EC5", /* cyan    */
  [15] = "#d1cecf", /* white   */

  /* special colors */
  [256] = "#111010", /* background */
  [257] = "#d1cecf", /* foreground */
  [258] = "#d1cecf",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
