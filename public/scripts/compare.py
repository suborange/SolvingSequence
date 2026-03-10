import re
import sys
from typing import List, Tuple, Iterator

def extract_numbers_from_text(text: str) -> List[float]:
    """Extract all numbers (int or float) from a text string."""
    # Pattern matches integers and floats (including negative numbers)
    pattern = r'-?\d+\.?\d*'
    matches = re.findall(pattern, text)
    numbers = []
    for match in matches:
        try:
            # Try to convert to int first, then float
            if '.' in match:
                numbers.append(float(match))
            else:
                numbers.append(int(match))
        except ValueError:
            continue
    return numbers

def read_file_by_chunks(filename: str, chunk_size: int = 1024) -> Iterator[str]:
    """Read file in chunks of specified size."""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            while True:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                yield chunk
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading file '{filename}': {e}")
        sys.exit(1)

def read_file_by_characters(filename: str) -> Iterator[str]:
    """Read file character by character."""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            while True:
                char = f.read(1)
                if not char:
                    break
                yield char
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading file '{filename}': {e}")
        sys.exit(1)

def compare_numbers_parallel(file1: str, file2: str, mode: str = 'chunk', chunk_size: int = 1024):
    """Compare numbers from two files in parallel (chunk by chunk or char by char)."""
    print(f"Comparing files '{file1}' and '{file2}' in {mode} mode")
    print("-" * 50)
    
    if mode == 'chunk':
        reader1 = read_file_by_chunks(file1, chunk_size)
        reader2 = read_file_by_chunks(file2, chunk_size)
    else:  # character mode
        reader1 = read_file_by_characters(file1)
        reader2 = read_file_by_characters(file2)
    
    chunk_num = 0
    total_matches = 0
    total_differences = 0
    
    # Build strings for character mode
    if mode == 'char':
        text1 = ""
        text2 = ""
        
        for char1, char2 in zip(reader1, reader2):
            text1 += char1
            text2 += char2
            
            # Process when we have complete numbers or reach certain length
            if len(text1) > 100 or (not char1.isdigit() and not char1 in '.-'):
                numbers1 = extract_numbers_from_text(text1)
                numbers2 = extract_numbers_from_text(text2)
                
                if numbers1 or numbers2:
                    chunk_num += 1
                    matches, diffs = compare_number_lists(numbers1, numbers2, f"Segment {chunk_num}")
                    total_matches += matches
                    total_differences += diffs
                
                text1 = ""
                text2 = ""
    else:
        # Chunk mode
        for chunk1, chunk2 in zip(reader1, reader2):
            chunk_num += 1
            numbers1 = extract_numbers_from_text(chunk1)
            numbers2 = extract_numbers_from_text(chunk2)
            
            matches, diffs = compare_number_lists(numbers1, numbers2, f"Chunk {chunk_num}")
            total_matches += matches
            total_differences += diffs
    
    print(f"\nSUMMARY:")
    print(f"Total matches: {total_matches}")
    print(f"Total differences: {total_differences}")

def compare_number_lists(numbers1: List[float], numbers2: List[float], label: str) -> Tuple[int, int]:
    """Compare two lists of numbers and print results."""
    if not numbers1 and not numbers2:
        return 0, 0
    
    print(f"\n{label}:")
    print(f"  File 1 numbers: {numbers1}")
    print(f"  File 2 numbers: {numbers2}")
    
    matches = 0
    differences = 0
    
    # Compare numbers at same positions
    min_len = min(len(numbers1), len(numbers2))
    for i in range(min_len):
        if numbers1[i] == numbers2[i]:
            print(f"  ✓ Position {i}: {numbers1[i]} == {numbers2[i]}")
            matches += 1
        else:
            print(f"  ✗ Position {i}: {numbers1[i]} != {numbers2[i]}")
            differences += 1
    
    # Handle different lengths
    if len(numbers1) != len(numbers2):
        longer = numbers1 if len(numbers1) > len(numbers2) else numbers2
        file_name = "File 1" if len(numbers1) > len(numbers2) else "File 2"
        print(f"  ! {file_name} has extra numbers: {longer[min_len:]}")
        differences += abs(len(numbers1) - len(numbers2))
    
    return matches, differences

def compare_all_numbers(file1: str, file2: str):
    """Extract all numbers from both files and compare them as complete lists."""
    print(f"Comparing all numbers from '{file1}' and '{file2}'")
    print("-" * 50)
    
    # Read entire files
    try:
        with open(file1, 'r', encoding='utf-8') as f:
            content1 = f.read()
        with open(file2, 'r', encoding='utf-8') as f:
            content2 = f.read()
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return
    except Exception as e:
        print(f"Error reading files: {e}")
        return
    
    # Extract all numbers
    numbers1 = extract_numbers_from_text(content1)
    numbers2 = extract_numbers_from_text(content2)
    
    matches, diffs = compare_number_lists(numbers1, numbers2, "Complete file comparison")
    
    print(f"\nSUMMARY:")
    print(f"Total numbers in file 1: {len(numbers1)}")
    print(f"Total numbers in file 2: {len(numbers2)}")
    print(f"Matches: {matches}")
    print(f"Differences: {diffs}")

def main():
    """Main function with user interface."""
    if len(sys.argv) < 3:
        print("Usage: python script.py <file1> <file2> [mode] [chunk_size]")
        print("Modes:")
        print("  'char' - Compare character by character")
        print("  'chunk' - Compare in chunks (default)")
        print("  'all' - Compare all numbers at once")
        print("Example: python compare.py ../files/pi.txt ../files/pi_dec_1m.txt chunk 512")
        return
    
    file1 = sys.argv[1]
    file2 = sys.argv[2]
    mode = sys.argv[3] if len(sys.argv) > 3 else 'chunk'
    chunk_size = int(sys.argv[4]) if len(sys.argv) > 4 else 1024
    
    if mode == 'all':
        compare_all_numbers(file1, file2)
    elif mode in ['char', 'chunk']:
        compare_numbers_parallel(file1, file2, mode, chunk_size)
    else:
        print("Invalid mode. Use 'char', 'chunk', or 'all'")

if __name__ == "__main__":
    main()



# looks like 1 million numbers compare just fine... need to check more now?