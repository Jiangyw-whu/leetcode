function binarySearch(target,arr,start,end) {
    if(start>end){
        return -1;
    }
    let start = start || 0;
    let end = end || arr.length-1;
    let mid = parseInt(start+(end-start)/2);
    if(target===arr[mid]){
        return mid;
    }else if(target>arr[mid]){
        return binarySearch(target,arr,mid+1,end);
    }else{
        return binarySearch(target,arr,start,mid-1);
    }
    return -1;
}