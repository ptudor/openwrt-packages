diff --git a/ubxtool.cc b/ubxtool.cc
index ceab36f..a92ce61 100644
--- a/ubxtool.cc
+++ b/ubxtool.cc
@@ -3,6 +3,7 @@
 #include <sys/time.h>
 #include <map>
 #include <sys/stat.h>                                                     
+#include <signal.h>
 #include <fcntl.h>                                                        
 #include <termios.h>                                                      
 #include <stdio.h>                                                        
