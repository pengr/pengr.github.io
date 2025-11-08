# 现在有这样的一个list:
# [[a1,b1,c1,d1],[a2,b2,...][a3,b3,c3,d3,e3]...... [ak,bk,ck]]

# 请对该list进行打乱，同时保证每一个index里的a,b,c,d 的顺序性。可以获取每一个数据的index

# 比如[[a1,b1],[a2,b2,c2],[a3,b3]]可以打乱为
# [a2,a1,b2,a3,b3,b1,c2]
 
# 最优解法是O(N), N=len(全部数据)

## 首先遍历这个list中的子list数，记为行号row_n;
## 然后遍历每个子list中每一个数组，index，作为列号column_n；
## [a1, b1]
## [a2, ]
## [a3, ]