#!/bin/bash

# 清理
rm -rf dist
rm -rf .angular

# 构建
ng build --configuration production --base-href=/2024IDPwD/

# 切换到gh-pages分支
git checkout gh-pages

# 备份.git文件夹
mv .git ../.git-backup

# 清理当前目录
rm -rf *

# 恢复.git文件夹
mv ../.git-backup .git

# 复制构建文件
cp -r dist/2024IDPwD/browser/* .

# 添加.nojekyll文件
touch .nojekyll

# 提交更改
git add .
git commit -m "Deploy to GitHub Pages"

# 强制推送
git push origin gh-pages --force

# 切回main分支
git checkout main 