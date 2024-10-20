const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#0D0E10", /* black   */
  [1] = "#1C6D57", /* red     */
  [2] = "#4D4D4E", /* green   */
  [3] = "#635D5E", /* yellow  */
  [4] = "#706B6C", /* blue    */
  [5] = "#847A7B", /* magenta */
  [6] = "#867E81", /* cyan    */
  [7] = "#c1bebf", /* white   */

  /* 8 bright colors */
  [8]  = "#878585",  /* black   */
  [9]  = "#1C6D57",  /* red     */
  [10] = "#4D4D4E", /* green   */
  [11] = "#635D5E", /* yellow  */
  [12] = "#706B6C", /* blue    */
  [13] = "#847A7B", /* magenta */
  [14] = "#867E81", /* cyan    */
  [15] = "#c1bebf", /* white   */

  /* special colors */
  [256] = "#0D0E10", /* background */
  [257] = "#c1bebf", /* foreground */
  [258] = "#c1bebf",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
