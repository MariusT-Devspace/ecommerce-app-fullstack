namespace EcommerceAPI.Utils
{
    public class StringUtils
    {
        public static string ToSlug(string s)
        {
            return s.Replace(' ', '-').ToLower().Trim();
        }
    }
}
