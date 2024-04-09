export default function generateUniqueName() {
    let date = new Date();
    let timestamp = date.getTime();
    let randomString = Math.random().toString(36).substring(2, 8); 
    let uniqueName = `${timestamp}_${randomString}`;
    return uniqueName;
}
