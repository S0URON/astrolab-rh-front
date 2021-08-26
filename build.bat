@echo on

rmdir /Q /S c:\users\mokni\Documents\stage\front-build\build

xcopy c:\users\mokni\Documents\stage\rh-manage\build c:\users\mokni\Documents\stage\front-build\build /E /H /C /I

echo completed !

pause